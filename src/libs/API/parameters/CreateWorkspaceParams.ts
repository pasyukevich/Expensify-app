type CreateWorkspaceParams = {
    policyID: string;
    adminsChatReportID: string;
    expenseChatReportID: string;
    ownerEmail: string;
    makeMeAdmin: boolean;
    policyName: string;
    type: string;
    adminsCreatedReportActionID: string;
    expenseCreatedReportActionID: string;
    customUnitID: string;
    customUnitRateID: string;
    engagementChoice?: string;
    guidedSetupData?: string;
    currency: string;
    file?: File;
    companySize?: string;
    userReportedIntegration?: string;
};

export default CreateWorkspaceParams;
