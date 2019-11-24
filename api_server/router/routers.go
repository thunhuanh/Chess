package router

import (
	"Chess/api_server/controllers"
	"github.com/go-chi/cors"
	"log"

	"net/http"

	httpSwagger "github.com/swaggo/http-swagger"

	middleAccess "Chess/api_server/middleware"

	"Chess/api_server/infrastructure"
	_ "Chess/docs"

	"github.com/go-chi/chi"
	"github.com/go-chi/chi/middleware"
	"github.com/go-chi/jwtauth"
	"github.com/go-chi/render"
)

// Router export router
func Router() http.Handler {
	r := chi.NewRouter()

	// * Declare Middleware
	authentication, err := middleAccess.NewAuthentication()
	if err != nil {
		log.Printf("Not found jwt public and private key\n")
		log.Fatal(err)
	}

	//allowed cors
	cors := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"Accept", "Authorization", "Content-Type", "X-CSRF-Token"},
		ExposedHeaders:   []string{"Link"},
		AllowCredentials: true,
		MaxAge:           300,
	})

	// * Use middleware
	r.Use(cors.Handler)
	r.Use(middleware.Logger)
	r.Use(middleware.URLFormat)
	r.Use(middleware.RequestID)
	r.Use(middleware.Recoverer)
	r.Use(render.SetContentType(render.ContentTypeJSON))


	//declare controller
	accountController, _ := controllers.NewAccountController()
	friendController, _ := controllers.NewFriendController()
	reportController, _ := controllers.NewReportController()
	roomController, _ := controllers.NewRoomController()

	//route
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

		//r.Post("/api/v1/be/logout", accountController.Logout)

		r.Route("/api/v1/be/friend", func(friendSubR chi.Router) {
			friendSubR.Post("/friends/new", friendController.CreateNewFriend)
			friendSubR.Get("/friends/all/{userId}", friendController.GetAllFriendByUserId)
			friendSubR.Delete("/friends/{userId}/{friendId}", friendController.DeleteFriendByFriendId)
		})

		r.Route("/api/v1/be/report", func(reportSubr chi.Router) {
			reportSubr.Get("/reports/filter/{reporterId}/{reportedAccountId}", reportController.FilterReport)
			reportSubr.Delete("/reports/{id}", reportController.DeleteReport)
			reportSubr.Post("/reports", reportController.SendReport)
			reportSubr.Get("/reports/all", reportController.GetAllReport)
		})

		r.Route("/api/v1/be/room", func(roomSubr chi.Router) {
			roomSubr.Post("/rooms", roomController.CreateRoom)
			roomSubr.Delete("/rooms/{roomId}", roomController.DeleteRoom)
			roomSubr.Get("/rooms/all", roomController.GetAllRoom)
		})

	})

	return r
}
