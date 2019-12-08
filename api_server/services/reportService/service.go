package reportService

import (
	model "Chess/api_server/models"
	"Chess/api_server/repositories/reportRepo"
)

type Service interface {
	SendReport(report *model.Report) (*model.Report, error)
	DeleteReport(id int) error
	FilterReport(ReporterId, ReportedAccountId int) ([]*model.Report, error)
	GetAllReport() ([]*model.Report, error)
}

type service struct {
	reportRepo model.ReportRepository
}

func (s *service) GetAllReport() ([]*model.Report, error) {
	reports, err := s.reportRepo.GetAllReport()
	if err != nil {
		return nil, err
	}
	return reports, nil
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
	return &service{
		reportRepo: reportRepo,
	}
}
