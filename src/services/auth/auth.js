import { baseApi, baseApiHeaders } from "..";
import { logout, setLogin } from "../../store/auth/authUserSlice";

const authService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        signUp: build.mutation ({
            query: (signUpData) => ({
                url: '/register', // * just to make sure if this is the endpoint name
                method: 'POST',
                body: signUpData
            }),
            onQueryStarted: async (_, { queryFulfilled }) => {
                try {
                    await queryFulfilled;
                } catch (error) {
                    console.error('There was an error registering user !!! --> ', error);
                }
            }
        }),
        login: build.mutation ({
            query: (loginData) => ({
                url: '/login', // * just to make sure if this is the endpoint name
                method: 'POST',
                body: loginData
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled
                    if (data.successful) {
                        const { user, result } = data
                        const token = result.split(' ')[1];
                        dispatch(setLogin({ name: user.name, email: user.email, token }));
                    }
                } catch (error) {
                    console.error('There was an error logging user !!! --> ', error);
                }
            }
        })
    })
});

const authServiceHeaders = baseApiHeaders.injectEndpoints({
    endpoints: (build) => ({
        logout: build.mutation ({
            query: () => ({
                url: '/logout',
                method: 'DELETE'
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    await queryFulfilled;
                    localStorage.clear();
                    dispatch(logout());
                } catch (error) {
                    console.error('There awas an error logout user !!! --> ', error);
                }
            }
        })
    })
});

export const {
    useSignUpMutation,
    useLoginMutation
} = authService;

export const { 
    useLogoutMutation 
} = authServiceHeaders;