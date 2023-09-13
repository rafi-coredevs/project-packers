export const user = {
    registerUser: {
        method: 'POST',
        uri: 'user',
        body: {
            fullName: undefined,
            email: undefined,
        },
        suggestions: {
            raw: "A raw example of the payload: { fullName:'Yeasir', email:'yeasir@mail.com', password:'packers123' }.",
            fullName: "Please enter your full name",
            email: "Please enter your email address",
            password: "Please enter your password",

        }
    },
    registerCustomer: {
        method: 'POST',
        uri: 'customer',
        body: {
            fullName: undefined,
            email: undefined,
        },
        suggestions: {
            raw: "A raw example of the payload: { fullName:'Yeasir', email:'yeasir@mail.com', password:'packers123' }.",
            fullName: "Please enter your full name",
            email: "Please enter your email address",
            password: "Please enter your password",
        }
    },
    registerStaff: {
        method: 'POST',
        uri: 'user/staff',
        body: {
            fullName: undefined,
            email: undefined,
            role: undefined,
            phone: undefined
        },
        suggestions: {
            raw: "A raw example of the payload: { fullName:'Yeasir', email:'yeasir@mail.com', password:'packers123' }.",
            fullName: "Please enter your full name",
            email: "Please enter email address",
            password: "Please enter password",
            role: "Please enter the role",
            phone: "Please enter your phone",

        }
    },
    logIn: {
        method: 'POST',
        uri: 'user/login',
        body: {
            email: undefined,
            password: undefined,
        },
        suggestions: {
            raw: "A raw example of the payload: { email:'yeasir@mail.com', password:'packers123' }.",
            email: "Please enter your email address",
            password: "Please enter your password",
        }
    },
    logOut: {
        method: 'GET',
        uri: 'user/logout',
    },
    fetchUser: {
        method: 'GET',
        uri: 'social/success',
        suggestions: {
            raw: "User that already logged in or has logged in using social"
        }
    },
    getUser: {
        method: "GET",
        uri: "user",
        params: {
            id: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'user/64b4cbc2bb769ae707dbfb4f'.",
            id: "Please provide 'id' field in the params object."
        }
    },
    getNext: {
        method: "GET",
        uri: "user/next",
        params: {
            current: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'user/next/64b4cbc2bb769ae707dbfb4f'.",
            curent: "Please provide 'current' field in the params object."
        }
    },
    allUser: {
        method: "GET",
        uri: "user",
        suggestions: {
            raw: "A raw example of the uri: 'user'."
        }
    },
    updateOwnProfile: {
        method: "PATCH",
        uri: "user/me",
        formData: true,
        body: {
            data: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'user/me'.",
        }
    },
    getOwn: {
        method: 'GET',
        uri: 'user/me',
        suggestions: {
            raw: "A raw example of the uri: 'user/me'."
        }
    },
    getProfile: {
        method: 'GET',
        uri: 'user/profile',
        params: {
            id: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'user/64b4cbc2bb769ae707dbfb4f'.",
            id: "Please provide 'id' field in the params object."
        }
    },
    updateUser: {
        method: "PATCH",
        uri: "user",
        params: {
            id: undefined
        },
        formData: true,
        body: {
            data: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'user/64b4cbc2bb769ae707dbfb4f'.",
            id: "Please provide 'id' field in the params object."
        }
    },
    deleteUser: {
        method: "DELETE",
        uri: "user",
        params: {
            id: undefined
        },
        suggestions: {
            raw: "A raw example of the uri: 'user/64b4cbc2bb769ae707dbfb4f'.",
            id: "Please provide 'id' field in the params object."
        }
    },
    sendOTP: {
        method: "POST",
        uri: "user/sendotp",
        body: {
            email: undefined
        },
        suggestions: {
            raw: "A raw example of payload: {email:yeasir@mail.com}",
            email: "Please provide email address"
        }
    },
    resendOTP: {
        method: "POST",
        uri: "user/resendotp",
        body: {
            token: undefined
        },
        suggestions: {
            raw: "A raw example of payload: {token:adaadadajsmijsaimooijihjisjposannjdpoisalkad}",
            token: "Please provide token"
        }
    },
    verifyOTP: {
        method: "POST",
        uri: "user/verifyotp",
        body: {
            otp: undefined,
        },
        suggestions: {
            raw: "A raw example of payload: {otp:1234}",
            otp: "Please provide otp"
        }
    },
    resetPassword: {
        method: "POST",
        uri: "user/resetpassword",
        body: {
            newpassword: undefined,
        },
        suggestions: {
            raw: "A raw example of payload: {newpassword:123456}",
            newpassword: "Please provide newpassword"
        }
    },
    logOutStaff: {
        method: "GET",
        uri: "user/logoutall",
        suggestions: {
            raw: "A raw example of payload: {user/logoutall}",
        }
    },
    exportCustomer:{
        method:"GET",
        uri:"export-customer",
        suggestions:{
            raw:"A raw example of payload: {export-customer",
        }
    }
}