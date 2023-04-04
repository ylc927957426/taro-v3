function fetch(option) {
	let headers = {
		'Content-Type': option.contentType || ((option.method === 'POST' || option.method === 'PUT') ?
			'application/json; charset=utf-8' : 'application/x-www-form-urlencoded'),
		'X-Requested-With': 'XMLHttpRequest',
		'Accept': 'application/json',
	}
	if (getToken()) {
		Object.assign(headers, {
			Authorization: `Bearer ${getToken()}`
		})
	}
	return new Promise((resolve, reject) => {
		Taro.request({
			url: `${getService(option.serviceName)}${option.url}`,
			data: option.params,
			header: headers,
			method: option.method,
			success: (res) => {
                console.log(res)
                resolve(res)
			},
			fail: (err) => {
                console.log(err)
                reject(err)
			}
		})
	})
}

function get(opt) {
	opt.method = 'GET'
	return fetch(opt)
}

function post(opt) {
	opt.method = 'POST'
	return fetch(opt)
}

function put(opt) {
	opt.method = 'PUT'
	return fetch(opt)
}

function del(opt) {
	opt.method = 'DELETE'
	return fetch(opt)
}
export default {
	get,
	post,
	put,
	del,
	fetch
}
