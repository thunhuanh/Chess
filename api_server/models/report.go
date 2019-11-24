package model

type Report struct {
	ID 					int
	ReporterId 			int
	Message 			string
	ReportedAccountId	int
}
 type ReportRepository interface {
	SendReport(report *Report) (*Report, error)
	DeleteReport(id int) error
	FilterReport(ReporterId, ReportedAccountId int) ([]*Report, error)
	GetAllReport()([]*Report, error)
 }