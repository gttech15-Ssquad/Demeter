export type HttpError = {
	response: {
		data: {
			error?: string | { message: string }
			errors?: string | string[]
			errorCode?: number
			message: string | string[]
			status: string
			success: boolean
		}
	}
}

// export type AuthError = {

// }

// {
//     "data": {
//         "status": false,
//         "statusCode": 400,
//         "timestamp": "2024-08-24T11:12:37.681Z",
//         "path": "/api/v1/user/login",
//         "error": {
//             "message": "Identity or password incorrect"
//         }
//     },

// }

export type MostTableProps = {
	name?: string
	added_By?: string
	type?: string
	status?: string
	date_joined?: string
	no_of_warehouse?: string
	date_added?: string
	created_by?: string
	farm?: string
	role?: string
	owned_by?: string
}
