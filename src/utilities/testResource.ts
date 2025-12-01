const UIText = {
    auth: {
        signIn: {
            title: "SIGN IN",
            email: "Email",
            password: "Password",
            keep_me_signed_in: "Keep me logged in",
            forgot_password: "Forgot Password?",
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
        forgotPassword: {
            title: "Forgot Password",
            description: "Enter your registered email address to receive a password reset link.",
            cancel: "Cancel",
            reset_link: "Send Reset Link"
        },
        resetPassword: {
            title: "Reset Your Password",
            description: "Please enter your new password below. Make sure it is strong and secure.",
            password: "Password",
            button: "Reset Password",
            success: {
                title: "Password Reset Successful",
                description: "Your password has been successfully updated. You can now log in with your new password.",
                button: "Continue to Login"
            },
            failed: {
                title: "Password Reset Failed",
                description: "There was an error resetting your password. Please try again or contact support.",
                button: "Try Again"
            }
        },
        signUp: {
            title: "SIGN UP",
            f_name: "First Name",
            l_name: "Last Name",
            email: "Email",
            password: "Password",
            confirmPassword: "Confirm Password",
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
                plan_type: "Plan Type",
                actions: "Delete",
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
            not_active: "No Plan Active",
            description: "Days remaining in your free trial",
            not_selected_description: "You currently have no active plan",
            no_selection_plan: "No active plan",
            trial_expires_dynamic: "Your free trial expires in ",
            not_selected_trial_expires: "No selection plan. Start your free trial today!"
        },
        account_status: {
            title: "Account Status",
            current_plan_status: "Your current plan status",
            plan_type: "Plan Type",
            not_selected: "Not Selected",
            status: "Status",
            in_active: "InActive"
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
            description: "You’re currently subscribed the",
            free_trial_description: "You do not have an active plan",
            free_trial: "No Active Plan"
        },
        monthly_plan: {
            title: "Professional",
            description: "Flexible plan for individuals who prefer month-to-month access",
            dollar: "£20",
            per_month: " / per month",
            button: "Activate Plan"
        },
        yearly_plan: {
            title: "Professional",
            description: "Best value for individuals committed to long-term productivity - includes a $40 annual discount",
            dollar: "£200",
            per_year: " / per year",
            button: "Request a Demo"
        },
        enterprise: {
            title: "Enterprise",
        },
        payment: {
            success: {
                title: "Payment Successful!",
                description: "Your payment has been processed successfully. You can now access your premium features.",
                button: "Continue to Dashboard"
            },
            failed: {
                title: "Payment Failed",
                description: "Your payment could not be processed. Please try again or contact support.",
                button: "Retry Payment"
            },
            processing: {
                title: "Processing...",
                description: " Please wait while we verify your payment."
            },
            cancel: {
                title: "Payment Canceled",
                description: "You have canceled the payment. You can go back to billing to retry or choose a different plan.",
                button: "Continue to Billing"
            },
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
            password: "Password",
            button: "Save Changes"
        }
    }
};

export default UIText;