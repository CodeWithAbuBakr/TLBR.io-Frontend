const UIText = {
    auth: {
        signIn: {
            title: "SIGN IN",
            email: "Email",
            password: "Password",
            keep_me_signed_in: "Keep me logged in",
            forgotPassword: "Forgot Password?",
            button: "Sign In",
        },
        verifyOTP: {
            title: "Verify Your Account",
            description: "Please enter the 6-digit verification code sent to your email.",
            code_not_recieved: "Didn’t receive the code? ",
            cancel: "Cancel",
            verify_account: "Verify Account",
            success: {
                title: "Verification Successful!",
                description: "Redirecting you to your dashboard..."
            }
        },
        signUp: {
            title: "SIGN UP",
            f_name: "First Name",
            l_name: "Last Name",
            email: "Email",
            password: "Password",
            by_creating_account: "By creating an account, you agree to the",
            terms_and_conditions: "Terms and Conditions",
            and_our: "and our",
            privacy_policy: "Privacy Policy",
            button: "Sign Up",
        },
        verifyUser: {
            failed: {
                title: "Verification Failed",
                description: "Oops! Something went wrong during email verification. Please try signing up again or request another verification email.",
                button: "Go to Sign Up"
            },
            success: {
                title: "Email Verified Successfully!",
                description_1: "Your email has been verified. You can now log in and start using ",
                description_2: "tlbr.io ",
                description_3: "to streamline your workflow and boost productivity.",
                button: "Continue to Sign In"
            }
        }
    },
    admin: {
        usersDetails: {
            title: "User Management",
            loading: "Loading users, please wait...",
            table: {
                name: "Name",
                email: "Email",
                role: "Role",
                actions: "Actions",
                not_found: "No users found"
            }
        },
        deleteUser: {
            title: "Confirm Delete User",
            description: "Are you sure you want to permanently delete this user? This action cannot be undone.",
            cancel: "Cancel",
            confirm_delete: "Confirm Delete"
        }
    },
    header: {
        user_Dropdown: {
            avtar: "JA",
            user_name: "Jayvin",
            user_email: "Jayvin@gmail.com",
            button: "Sign out"
        }
    },
    dashboard: {
        trial_period: {
            title: "Trial Period",
            description: "Days remaining in your free trial",
            seven: "7",
            remaining_days: "/ 7 days remaining",
            trial_expires: "Your free trial expires in 7 days"
        },
        account_status: {
            title: "Account Status",
            current_plan_status: "Your current plan status",
            plan_type: "Plan Type",
            status: "Status"
        },
        quick_stats: {
            title: "Quick Stats",
            usage_overview: "Your usage overview",
            downloads: "Downloads",
            version: "Version"
        },
        get_started: {
            title: "Getting Started",
            description: "Quick actions to help you begin",
            download: {
                title: "Download Add-in",
                description: "Get the latest version of TLBR for PowerPoint"
            },
            billing: {
                title: "View Billing",
                description: "Get the latest version of TLBR for PowerPoint"
            },
            setting: {
                title: "Update Setting",
                description: "Get the latest version of TLBR for PowerPoint"
            }
        }
    },
    billing: {
        title: "Billing & Subscription",
        description: "Manage your subscription and payment methods",
        current_plan: {
            title: "Current Plan",
            description: "You’re currently on the Free Trial",
            free_trial: "Monthly",
            seven_day: "21-day remaining",
            month: " / month"
        },
        free_plan: {
            title: "Free Trial",
            description: "Enjoy full access to all features free for 7 days — no commitment required.",
            dollar: "$0 ",
            per_month: "/ 7-Day Free Trial",
            button: "Upgrade to Professional (Monthly)"
        },
        monthly_plan: {
            title: "Monthly Plan",
            description: "Flexible plan for individuals who prefer month-to-month access",
            dollar: "$20 ",
            per_month: "/ per month",
            button: "Upgrade to Professional (Monthly)"
        },
        yearly_plan: {
            title: "Yearly Plan",
            description: "Best value for individuals committed to long-term productivity — includes a $20 annual discount",
            dollar: "$120 ",
            per_year: "/ per year",
            button: "Upgrade to Professional (Yearly – Save $20)"
        },
        payment_history: {
            title: "Payment History",
            description: "Your recent billing transactions",
            not_found: "No payment history available",
            table: {
                date: "Date",
                plan: "Plan",
                amount: "Amount",
                status: "Status",
                invoice: "Invoice"
            }
        }
    },
    download: {
        title: "Download TLBR.io for Windows",
        description: "Get the latest Windows version of TLBR.io and enhance your productivity with advanced PowerPoint integration.",
        windows: {
            title: "TLBR.io for Windows",
            description: "Compatible with Windows 10 and later.",
            button: "Download for Windows"
        },
        version: {
            title: "Latest Version",
            description: "TLBR.io v",
            released: " — Released "
        },
        system_requirements: {
            title: "System Requirements"
        },
        installation_instructions: {
            title: "Installation Instructions"
        }
    },
    setting: {
        title: "Settings",
        description: "Manage your profile, application preferences, and account details.",
        profile_information: {
            title: "Profile Information",
            full_name: "Full Name",
            email: "Email Address",
            button: "Save Changes"
        },
        account_management: {
            title: "Account Management",
            description: "Secure your account and manage password settings.",
            change_password: "Change Password",
            delete: "Delete",
        }
    }
};

export default UIText;