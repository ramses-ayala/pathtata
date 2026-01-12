import { baseApi, baseApiHeaders } from "..";
import { logout, setLogin } from "../../store/auth/authUserSlice";

const authService = baseApi.injectEndpoints({
    endpoints: (build) => ({
        signUp: build.mutation ({
            query: (signUpData) => ({
                url: '/auth/register',
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
                url: '/auth/login',
                method: 'POST',
                body: loginData
            }),
            onQueryStarted: async (_, { dispatch, queryFulfilled }) => {
                try {
                    const { data } = await queryFulfilled;
                    if (data.data) {
                        const { data: { name, email, token } } = data;
                        // const token = result.split(' ')[1];
                        dispatch(setLogin({ name, email, token }));
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