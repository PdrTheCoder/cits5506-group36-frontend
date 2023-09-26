const prod = {
    url: {
        API_BASE: 'http://3.27.67.131:5009/'
    }
}

const dev = {
    url: {
        API_BASE: 'http://127.0.0.1:5009/'
    }
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;