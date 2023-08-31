import { redirect } from '@sveltejs/kit'

import { PUBLIC_USERFRONT_GLOBAL_TENANT } from '$env/static/public'
import { USERFRONT_API_KEY } from '$env/static/private'

const SECONDS_PER_DAY = 24 * 60 * 60

export async function load({ url, cookies }) {
	const uuid = url.searchParams.get('uuid')
	const token = url.searchParams.get('token')
	const type = url.searchParams.get('type')
	const redirectParam = url.searchParams.get('redirect')

	if (uuid && token && type && redirectParam) {
		const payload = {
			token,
			uuid,
			tenantId: PUBLIC_USERFRONT_GLOBAL_TENANT,
		}

		try {
			const { tokens } = await login(payload)

				;['access', 'id', 'refresh'].forEach((name) => {
					cookies.set(`${name}.${PUBLIC_USERFRONT_GLOBAL_TENANT}`, tokens[name].value, {
						path: '/',
						httpOnly: false,
						maxAge: tokens[name].cookieOptions.expires * SECONDS_PER_DAY,
					})
				})
		} catch (error) {
			console.log(error)
			throw new Error('NO LOGIN SORRY')
		}
		console.log('Redirect to home page.')
		throw redirect(302, '/')
	}

	return {}
}

async function login(payload) {
	const url = `https://api.userfront.com/v0/auth/link`
	const options = {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
			origin: 'http://localhost:5173',
			Authorization: `Bearer ${USERFRONT_API_KEY}`,
		},
		body: JSON.stringify(payload),
	}

	const response = await fetch(url, options)

	if (response.status !== 200) {
		const json = await response.json()
		console.log('error', { json })

		const errorMessage =
			`${json.statusCode} (${json.error.type}): ${json.message}\n\n` +
			`PUT ${url} payload = ${JSON.stringify(payload, null, 4)}`
		throw new Error(errorMessage)
	}

	const json = await response.json()
	console.log('success', { json })
}
