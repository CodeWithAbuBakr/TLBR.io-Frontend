import type { Payment } from "./type";

export const freePlan = [
    "Full-feature 7-day trial included",
    "All options from Professional plan",
    "Dedicated account manager support",
    "Custom system integrations provided",
    "Guaranteed service-level assurance"
];

export const monthlyPlan = [
    "Access to all essential core tools",
    "Unlimited workspaces and projects",
    "Priority assistance through email",
    "Teamwide collaboration features",
    "Includes 7-day trial before billing"
];

export const yearlyPlan = [
    "Everything offered in Monthly plan",
    "Dedicated account manager support",
    "Custom onboarding and integrations",
    "Full service-level agreement (SLA)",
    "Includes 7-day trial before annual pay"
];

export const paymentHistory: Payment[] = [
    {
        date: "Oct 01, 2025",
        plan: "Professional (Yearly)",
        amount: "$120.00",
        status: "Paid",
        invoice: "#INV-1051",
    },
    {
        date: "Sep 15, 2025",
        plan: "Professional (Monthly)",
        amount: "$20.00",
        status: "Paid",
        invoice: "#INV-1047",
    },
    {
        date: "Aug 15, 2025",
        plan: "Professional (Yearly)",
        amount: "$120.00",
        status: "Failed",
        invoice: "#INV-1043",
    },
    {
        date: "Jul 15, 2025",
        plan: "Professional (Monthly)",
        amount: "$20.00",
        status: "Paid",
        invoice: "#INV-1039",
    },
    {
        date: "Jun 15, 2025",
        plan: "Professional (Monthly)",
        amount: "$20.00",
        status: "Pending",
        invoice: "#INV-1035",
    },
];

export const latestVersion = {
    version: "1.2.3",
    releaseDate: "October 15, 2025",
    updates: [
        "Improved performance and stability",
        "Enhanced Office add-in integration",
        "Minor UI and dark mode fixes",
    ],
};

export const systemRequirements = [
    "Operating System: Windows 10 or later (64-bit)",
    "RAM: Minimum 4 GB (8 GB Recommended)",
    "Storage: 200 MB free space",
    "Internet connection required for updates and activation",
    "Microsoft PowerPoint 2016 or later (for Add-in usage)",
];

export const installSteps = [
    "Download the TLBR.io Windows installer below.",
    "Run the installer and follow the on-screen instructions.",
    "Once installed, open Microsoft PowerPoint.",
    "Navigate to the Add-ins tab and enable TLBR.io.",
    "Sign in to your TLBR.io account to activate the add-in.",
];
