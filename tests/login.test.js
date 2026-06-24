import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '10s', target: 10 }, // Ramp-up to 10 users 
        { duration: '20s', target: 10 },  // Stay at 10 users 
        { duration: '10s', target: 30 }, // Ramp-up to 30 users
        { duration: '20s', target: 30 }, // Stay at 30 users
        { duration: '20s', target: 0 }   // Ramp-down to 0 users
    ],
    thresholds: {
        http_req_duration: ['p(90)<3000', 'max<5000'],
        http_req_failed: ['rate<0.01'] 
    },
};

export default function () {
    const url = 'http://localhost:3000/login';

    const payload = JSON.stringify({
        username: 'julio.lima',
        senha: '123456',
    });
    const params = {
        headers: {
            'Content-Type': 'application/json',
        },
    };
    const res = http.post(url, payload, params);

    check(res, {
        'Status code is 200': (r) => r.status === 200,
        'Token é string': (r) => typeof r.json().token === 'string'
    });
    sleep(1);
}
