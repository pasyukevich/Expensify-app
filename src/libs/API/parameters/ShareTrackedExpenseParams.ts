import type {Receipt} from '@src/types/onyx/Transaction';

type ShareTrackedExpenseParams = {
    amount: number;
    currency: string;
    comment: string;
    created: string;
    merchant: string;
    policyID: string | undefined;
    transactionID: string | undefined;
    moneyRequestPreviewReportActionID: string | undefined;
    moneyRequestReportID: string | undefined;
    moneyRequestCreatedReportActionID: string | undefined;
    actionableWhisperReportActionID: string | undefined;
    modifiedExpenseReportActionID: string;
    reportPreviewReportActionID: string | undefined;
    category?: string;
    tag?: string;
    receipt?: Receipt;
    taxCode: string;
    taxAmount: number;
    billable?: boolean;
    waypoints?: string;
    customUnitID?: string;
    customUnitRateID?: string;
    policyExpenseChatReportID?: string;
    policyExpenseCreatedReportActionID?: string;
    adminsChatReportID?: string;
    adminsCreatedReportActionID?: string;
    engagementChoice?: string;
    guidedSetupData?: string;
    description?: string;
    accountantEmail: string;
    policyName?: string;
    attendees?: string;
};

export default ShareTrackedExpenseParams;
