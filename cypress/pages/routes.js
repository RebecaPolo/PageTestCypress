
const routes = {
    //all users
    login: '/auth/login',
    dashboard: '/dashboard/index',
    directory: '/directory/viewDirectory',
    buzzView: '/buzz/viewBuzz',

    //user
    userLeaveView: '/leave/viewMyLeaveList',
    userTimesheet: '/time/viewMyTimesheet',
    userPerformance: '/performance/myPerformanceReview',
    userClaimView: '/claim/viewClaim',
    userClaimSubmit: '/claim/submitClaim',


    //admin
    adminViewUsers: '/admin/viewSystemUsers',
    adminAddUser: '/admin/saveSystemUser',
    pimViewList: '/pim/viewEmployeeList',
    pimAddEmployee: '/pim/addEmployee',
    adminLeaveViewList: '/leave/viewLeaveList',
    adminTime: '/time/viewEmployeeTimesheet',
    recruitmentCandidates: '/recruitment/viewCandidates',
    recruitmentAddCandidated: '/recruitment/addCandidate',
    performance: '/performance/searchEvaluatePerformanceReview',
    adminclaimView: '/claim/viewAssignClaim',
    adminclaimAdd: '/claim/assignClaim',

}
export default routes;