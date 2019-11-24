package reportRepo

import (
	"Chess/api_server/infrastructure"
	model "Chess/api_server/models"
)

type ReportRepository struct {
}

func (ReportRepository) GetAllReport() ([]*model.Report, error) {
	db := infrastructure.GetDB()

	var reports []*model.Report

	if err := db.Find(&reports).Error; err != nil{
		return nil, err
	}

	return reports, nil
}

func (ReportRepository) SendReport(report *model.Report) (*model.Report, error) {
	db := infrastructure.GetDB()

	if err := db.Create(&report).Error; err != nil {
		return nil, err
	}

	return report, nil

}

func (ReportRepository) DeleteReport(id int) error {
	db := infrastructure.GetDB()

	if err := db.Delete(&model.Report{}, id).Error; err != nil{
		return err
	}
	return nil
}

func (ReportRepository) FilterReport(ReporterId, ReportedAccountId int) ([]*model.Report, error) {
	db := infrastructure.GetDB()

	var temp []*model.Report
	err := db.
		Table("reports").
		Select("*").
		Where("reporter_id = ? and reported_account_id = ?", ReporterId, ReportedAccountId).
		Scan(&temp).Error

	if err != nil{
		return nil, err
	}

	return temp, nil
}

func NewReportRepository() model.ReportRepository {
	return &ReportRepository{}
}