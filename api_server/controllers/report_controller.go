package controllers

import (
	model "Chess/api_server/models"
	"Chess/api_server/services/reportService"
	"encoding/json"
	"github.com/go-chi/chi"
	"github.com/go-chi/render"
	"log"
	"net/http"
	"strconv"
)

type ReportController interface {
	SendReport(w http.ResponseWriter, r *http.Request)
	DeleteReport(w http.ResponseWriter, r *http.Request)
	FilterReport(w http.ResponseWriter, r *http.Request)
	GetAllReport(w http.ResponseWriter, r *http.Request)
}

type reportController struct {
	reportService reportService.Service
}

// Get all report godoc
// @tags report-manager-apis
// @Summary Get all report
// @Description Get all report
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Success 200 {object} controllers.Response
// @Router /report/reports/all [get]
func (rc *reportController) GetAllReport(w http.ResponseWriter, r *http.Request) {
	reports, err := rc.reportService.GetAllReport()

	var res *Response
	if err != nil {
		res = &Response{
			Data:    nil,
			Message: "get records failed. " + err.Error(),
			Success: false,
		}
	} else {
		res = &Response{
			Data:    reports,
			Message: "get records successful",
			Success: true,
		}
	}
	render.JSON(w, r, res)
}

// Send report godoc
// @tags report-manager-apis
// @Summary Send report
// @Description Send report
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param ReportInformation body controllers.ReportPayload true "Report information"
// @Success 200 {object} controllers.Response
// @Router /report/reports [post]
func (rc *reportController) SendReport(w http.ResponseWriter, r *http.Request) {
	var res *Response
	var data ReportPayload
	decoder := json.NewDecoder(r.Body)

	if err := decoder.Decode(&data); err != nil{
		log.Fatal(err)
	}

	report := model.Report{
		ReporterId: data.ReporterId,
		ReportedAccountId: data.ReportedAccountId,
		Message: data.Message,
	}

	temp, err := rc.reportService.SendReport(&report)
	if err != nil {
		res = &Response{
			Data:    nil,
			Message: "Create report failed. " + err.Error(),
			Success: false,
		}
	} else {
		res = &Response{
			Data:    temp,
			Message: "Create report successful.",
			Success: true,
		}
	}

	render.JSON(w, r, res)
}


// Delete report by id godoc
// @tags report-manager-apis
// @Summary Delete report by id
// @Description Delete report by id
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param id path integer true "id of report"
// @Success 200 {object} controllers.Response
// @Router /report/reports/{id} [delete]
func (rc *reportController) DeleteReport(w http.ResponseWriter, r *http.Request) {
	id, _ := strconv.Atoi(chi.URLParam(r, "id"))

	err := rc.reportService.DeleteReport(id)

	var res *Response
	if err != nil {
		res = &Response{
			Data:    nil,
			Message: "delete report failed. " + err.Error(),
			Success: false,
		}
	} else {
		res = &Response{
			Data:    nil,
			Message: "delete report successful",
			Success: true,
		}
	}
	render.JSON(w, r, res)
}

// Filter report by id godoc
// @tags report-manager-apis
// @Summary Filter report by id
// @Description Filter report by id
// @Accept json
// @Produce json
// @Security ApiKeyAuth
// @Param reporterId path integer false "id of report"
// @Param reportedAccountId path integer false "id of report"
// @Success 200 {object} controllers.Response
// @Router /report/reports/filter/{reporterId}/{reportedAccountId} [get]
func (rc *reportController) FilterReport(w http.ResponseWriter, r *http.Request) {
	reporterId,_ := strconv.Atoi(chi.URLParam(r, "reporterId"))
	reportedAccount,_ := strconv.Atoi(chi.URLParam(r, "reportedAccountId"))

	reports, err := rc.reportService.FilterReport(reporterId, reportedAccount)

	var res *Response
	if err != nil {
		res = &Response{
			Data:    nil,
			Message: "get records failed. " + err.Error(),
			Success: false,
		}
	} else {
		res = &Response{
			Data:    reports,
			Message: "get records successful",
			Success: true,
		}
	}
	render.JSON(w, r, res)
}

func NewReportController() (ReportController, error) {
	reportService := reportService.NewReportService()
	return &reportController{
		reportService: reportService,
	}, nil
}


type ReportPayload struct {
	ReporterId 			int
	Message 			string
	ReportedAccountId	int
}