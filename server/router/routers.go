package router

import (
	"Chess/server/controllers"
	"fmt"
	"log"

	"net/http"

	httpSwagger "github.com/swaggo/http-swagger"

	middleAccess "Chess/server/middleware"

	_ "Chess/server/docs"
	"Chess/server/infrastructure"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/jwtauth"
	"github.com/go-chi/render"
)

// Router export router
func Router() http.Handler {
	r := chi.NewRouter()

	// * Declare Repository

	// * Declare Middleware
	authentication, err := middleAccess.NewAuthentication()
	if err != nil {
		log.Printf("Not found jwt public and private key\n")
		log.Fatal(err)
	}

	// * Use middleware
	r.Use(middleware.Logger)
	r.Use(middleware.URLFormat)
	r.Use(middleware.RequestID)
	r.Use(middleware.Recoverer)
	r.Use(render.SetContentType(render.ContentTypeJSON))


	//declare controller
	accountController, err := controllers.NewAccountController()
	if err != nil {
		log.Fatal(err)
	}
	friendController, _ := controllers.NewFriendController()


	//route
	r.Get("/", func(w http.ResponseWriter, r* http.Request){
		fmt.Fprintf(w, "Hello World!")
	})

	r.Get("/api/v1/be/swagger/*", httpSwagger.Handler(
		httpSwagger.URL(infrastructure.HttpSwagger),
	))

	r.Post("/api/v1/be/account/create", accountController.CreateNewUser)
	r.Route("/api/v1/be/access", func(subR chi.Router) {
		subR.Post("/login", accountController.Login)
		subR.Post("/login/token", accountController.LoginWithToken)
	})

	//authentication
	r.Group(func(r chi.Router) {
		r.Use(jwtauth.Verifier(authentication.GetTokenAuth()))
		r.Use(jwtauth.Authenticator)

		r.Route("/api/v1/be/account", func(subR chi.Router) {
			subR.Get("/accounts", accountController.FilterPaging)
			subR.Get("/{userId}", accountController.GetUserById)
			subR.Put("/{accountId}", accountController.UpdateUser)
			subR.Put("/password", accountController.ChangePassword)
			subR.Delete("/{userId}", accountController.RemoveUser)
		})

		r.Post("/api/v1/be/logout", accountController.Logout)

		r.Route("/api/v1/be/friend", func(friendSubR chi.Router) {
			friendSubR.Post("/friends/new", friendController.CreateNewFriend)
			friendSubR.Get("/friends/all/{userId}", friendController.GetAllFriendByUserId)
			friendSubR.Delete("/friends/{userId}/{friendId}", friendController.DeleteFriendByFriendId)
		})

	})

	return r
}
