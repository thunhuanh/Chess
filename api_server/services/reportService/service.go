package reportService

import (
	model "Chess/api_server/models"
	accountRepo2 "Chess/api_server/repositories/accountRepo"
	"Chess/api_server/repositories/reportRepo"
)

type Service interface {
	SendReport(report *model.Report) (*model.Report, error)
	DeleteReport(id int) error
	FilterReport(ReporterId, ReportedAccountId int) ([]*model.Report, error)
	GetAllReport() ([]*model.ReportPayload, error)
}

type service struct {
	reportRepo model.ReportRepository
	accountRepo model.UserRepository
}

func (s *service) GetAllReport() ([]*model.ReportPayload, error) {
	reports, err := s.reportRepo.GetAllReport()
	if err != nil {
		return nil, err
	}

	var reportPayload []*model.ReportPayload

	for _, report := range reports{
		reporter, _ := s.accountRepo.FindById(report.ReporterId)
		reportedUser, _ := s.accountRepo.FindById(report.ReportedAccountId)
		temp := model.ReportPayload{
			ID: report.ID,
			Reporter: reporter,
			ReportedUser:reportedUser,
			Message:report.Message,
		}

		reportPayload = append(reportPayload, &temp)
	}

	return reportPayload, nil
}

func (s *service) SendReport(report *model.Report) (*model.Report, error) {
	temp, err := s.reportRepo.SendReport(report)
	if err != nil{
		return nil, err
	}

	return temp, nil
}

func (s *service) DeleteReport(id int) error {
	err := s.reportRepo.DeleteReport(id)
	if err != nil{
		return err
	}
	return nil
}

func (s *service) FilterReport(ReporterId, ReportedAccountId int) ([]*model.Report, error) {
	reports, err := s.reportRepo.FilterReport(ReporterId, ReportedAccountId)
	if err != nil {
		return nil, err
	}

	return reports, nil
}

func NewReportService() Service {
	reportRepo := reportRepo.NewReportRepository()
	accountRepo := accountRepo2.NewUserRepository()
	return &service{
		reportRepo: reportRepo,
		accountRepo: accountRepo,
	}
}
