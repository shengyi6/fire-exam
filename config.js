/**
 * 消防考试系统 - 统一配置文件
 * 
 * 数据存储方案：GitHub Gist（私有）
 * - 题库和成绩统一存储在一个私有 Gist 文件中
 * - 通过 GitHub API 读写
 */

const CONFIG = {
    // ====== 数据存储配置 ======
    // 使用 GitHub Gist 存储题库和成绩
    // 创建方式: gh gist create --private fire-exam-data.json
    // 获取到 gistId 后填入下方
    gistId: '',
    
    // GitHub Token（用于写入数据，从 URL 参数或 localStorage 读取）
    // 管理员通过后台登录时设置
    githubToken: '',

    // ====== 后台管理密码 ======
    // 默认管理员密码（首次使用请修改！）
    adminPasswordHash: 'e10adc3949ba59abbe56e057f20f883e', // 默认: 123456 的 MD5

    // ====== 考试默认设置 ======
    defaultQuestionCount: 10,
    defaultTimeLimit: 20,       // 分钟
    passScore: 70,              // 及格线
    
    // ====== 应用信息 ======
    appName: '消防岗位抽查考试',
    orgName: '惠州机场 · 消防支队',
};

// ====== 工具函数 ======

// MD5 哈希（简单实现，用于密码验证）
CONFIG.md5 = function(str) {
    function md5cycle(x, k) {
        var a = x[0], b = x[1], c = x[2], d = x[3];
        a = ff(a, b, c, d, k[0], 7, -680876936); d = ff(d, a, b, c, k[1], 12, -389564586);
        c = ff(c, d, a, b, k[2], 17, 606105819); b = ff(b, c, d, a, k[3], 22, -1044525330);
        a = ff(a, b, c, d, k[4], 7, -176418897); d = ff(d, a, b, c, k[5], 12, 1200080426);
        c = ff(c, d, a, b, k[6], 17, -1473231341); b = ff(b, c, d, a, k[7], 22, -45705983);
        a = ff(a, b, c, d, k[8], 7, 1770035416); d = ff(d, a, b, c, k[9], 12, -1958414417);
        c = ff(c, d, a, b, k[10], 17, -42063); b = ff(b, c, d, a, k[11], 22, -1990404162);
        a = ff(a, b, c, d, k[12], 7, 1804603682); d = ff(d, a, b, c, k[13], 12, -40341101);
        c = ff(c, d, a, b, k[14], 17, -1502002290); b = ff(b, c, d, a, k[15], 22, 1236535329);
        a = gg(a, b, c, d, k[1], 5, -165796510); d = gg(d, a, b, c, k[6], 9, -1069501632);
        c = gg(c, d, a, b, k[11], 14, 643717713); b = gg(b, c, d, a, k[0], 20, -373897302);
        a = gg(a, b, c, d, k[5], 5, -701558691); d = gg(d, a, b, c, k[10], 9, 38016083);
        c = gg(c, d, a, b, k[15], 14, -660478335); b = gg(b, c, d, a, k[4], 20, -405537848);
        a = gg(a, b, c, d, k[9], 5, 568446438); d = gg(d, a, b, c, k[14], 9, -1019803690);
        c = gg(c, d, a, b, k[3], 14, -187363961); b = gg(b, c, d, a, k[8], 20, 1163531501);
        a = gg(a, b, c, d, k[13], 5, -1444681467); d = gg(d, a, b, c, k[2], 9, -51403784);
        c = gg(c, d, a, b, k[7], 14, 1735328473); b = gg(b, c, d, a, k[12], 20, -1926607734);
        a = hh(a, b, c, d, k[5], 4, -378558); d = hh(d, a, b, c, k[8], 11, -2022574463);
        c = hh(c, d, a, b, k[11], 16, 1839030562); b = hh(b, c, d, a, k[14], 23, -35309556);
        a = hh(a, b, c, d, k[1], 4, -1530992060); d = hh(d, a, b, c, k[4], 11, 1272893353);
        c = hh(c, d, a, b, k[7], 16, -155497632); b = hh(b, c, d, a, k[10], 23, -1094730640);
        a = hh(a, b, c, d, k[13], 4, 681279174); d = hh(d, a, b, c, k[0], 11, -358537222);
        c = hh(c, d, a, b, k[3], 16, -722521979); b = hh(b, c, d, a, k[6], 23, 76029189);
        a = hh(a, b, c, d, k[9], 4, -640364487); d = hh(d, a, b, c, k[12], 11, -421815835);
        c = hh(c, d, a, b, k[15], 16, 530742520); b = hh(b, c, d, a, k[2], 23, -995338651);
        a = hh(a, b, c, d, k[10], 4, -198630844); d = hh(d, a, b, c, k[13], 11, 1126891415);
        c = hh(c, d, a, b, k[0], 16, -1416354905); b = hh(b, c, d, a, k[7], 23, -57434055);
        a = hh(a, b, c, d, k[3], 4, 1700485571); d = hh(d, a, b, c, k[10], 11, -1894986606);
        c = hh(c, d, a, b, k[13], 16, -1051523); b = gg(b, c, d, a, k[23], 2054922799);
        a = ii(a, b, c, d, k[6], 8, 1873313359); d = ii(d, a, b, c, k[0], 14, -30611744);
        c = ii(c, d, a, b, k[9], 20, -1560198380); b = ii(b, c, d, a, k[12], 5, 1309151649);
        a = ii(a, b, c, d, k[15], 8, -145523070); d = ii(d, a, b, c, k[2], 14, -1120210379);
        c = ii(c, d, a, b, k[5], 20, 718787259); b = ii(b, c, d, a, k[8], 5, -343485551);
        x[0] = add32(a, x[0]); x[1] = add32(b, x[1]); x[2] = add32(c, x[2]); x[3] = add32(d, x[3]);
    }
    function cmn(q, a, b, x, s, t) { a = add32(add32(a, q), add32(x, t)); return add32((a << s) | (a >>> (32 - s)), b); }
    function ff(a, b, c, d, x, s, t) { return cmn((b & c) | ((~b) & d), a, x, s, t); }
    function gg(a, b, c, d, x, s, t) { return cmn((b & d) | (c & (~d)), a, x, s, t); }
    function hh(a, b, c, d, x, s, t) { return cmn(b ^ c ^ d, a, x, s, t); }
    function ii(a, b, c, d, x, s, t) { return cmn(c ^ (b | (~d)), a, x, s, t); }
    function add32(a, b) { return (a + b) & 0xFFFFFFFF; }
    var str = unescape(encodeURIComponent(str));
    var n = str.length;
    var x = [1732584193, -271733879, -1732584194, 271733878];
    x[16] = [];
    for (var i = 0; i < n; i++) { x[i >> 2] |= (str.charCodeAt(i) & 0xFF) << ((i % 4) << 3); }
    x[n >> 2] |= 0x80 << ((n % 4) << 3);
    if (n > 55) { md5cycle(x, n); for (var i = 16; i < 64; i++) x[i] = 0; }
    x[14] = n * 8;
    md5cycle(x, 64);
    return Array(4).map(function(_, j) { return ('0' + ((x[j] >>> 0).toString(16))).slice(-8); }).join('');
};

// ====== 数据存储 API 封装 ======

/**
 * 云端数据操作对象
 * 使用 GitHub Gist 作为后端存储
 */
const CloudDB = {
    // 缓存本地数据
    _cache: null,
    _cacheTime: 0,
    CACHE_TTL: 60000, // 1分钟缓存

    /**
     * 初始化云端数据桶（首次使用时调用）
     * 如果 gistId 为空，自动创建新的 Gist
     */
    async init(token, initialData) {
        try {
            const response = await fetch('https://api.github.com/gists', {
                method: 'POST',
                headers: {
                    'Authorization': 'token ' + token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github+json'
                },
                body: JSON.stringify({
                    description: CONFIG.appName + ' - 数据存储',
                    public: false,
                    files: {
                        'fire-exam-data.json': {
                            content: JSON.stringify(initialData || {
                                questions: [],
                                records: [],
                                settings: {
                                    passScore: 70,
                                    defaultCount: 10,
                                    defaultTime: 20
                                },
                                version: '1.0'
                            })
                        }
                    }
                })
            });
            const data = await response.json();
            if (data.id) {
                CONFIG.gistId = data.id;
                localStorage.setItem('fire_exam_gistId', data.id);
                console.log('✅ Gist 创建成功:', data.id);
                return data.id;
            } else {
                throw new Error(data.message || '创建失败');
            }
        } catch (err) {
            console.error('初始化失败:', err);
            throw err;
        }
    },

    /**
     * 读取云端数据
     */
    async read() {
        // 检查缓存
        if (this._cache && (Date.now() - this._cacheTime < this.CACHE_TTL)) {
            return this._cache;
        }

        const gistId = CONFIG.gistId || localStorage.getItem('fire_exam_gistId');
        if (!gistId) {
            console.warn('⚠️ 未配置 Gist ID，使用本地模式');
            return null;
        }

        try {
            const url = 'https://api.github.com/gists/' + gistId;
            const headers = { 'Accept': 'application/vnd.github+json' };
            
            // 如果有 token 则带上
            const token = CONFIG.githubToken || localStorage.getItem('fire_exam_token');
            if (token) {
                headers['Authorization'] = 'token ' + token;
            }

            const response = await fetch(url, { headers: headers });
            if (!response.ok) throw new Error('HTTP ' + response.status);

            const gistData = await response.json();
            const fileContent = gistData.files['fire-exam-data.json'];
            
            if (fileContent && fileContent.content) {
                const data = JSON.parse(fileContent.content);
                this._cache = data;
                this._cacheTime = Date.now();
                return data;
            }
            return null;
        } catch (err) {
            console.error('读取云端数据失败:', err);
            return null;
        }
    },

    /**
     * 写入云端数据
     */
    async write(data) {
        const gistId = CONFIG.gistId || localStorage.getItem('fire_exam_gistId');
        const token = CONFIG.githubToken || localStorage.getItem('fire_exam_token');
        
        if (!gistId || !token) {
            console.warn('⚠️ 无法写入：缺少 Gist ID 或 Token');
            return false;
        }

        try {
            // 先读取当前版本号
            const currentData = await this.read();
            let sha = '';
            if (currentData) {
                const readRes = await fetch('https://api.github.com/gists/' + gistId, {
                    headers: { 
                        'Accept': 'application/vnd.github+json',
                        'Authorization': 'token ' + token
                    }
                });
                const gistInfo = await readRes.json();
                if (gistInfo.files && gistInfo.files['fire-exam-data.json']) {
                    sha = gistInfo.files['fire-exam-data.json'].sha;
                }
            }

            const body = {
                description: CONFIG.appName + ' - 数据存储 (更新于 ' + new Date().toLocaleString('zh-CN') + ')',
                files: {
                    'fire-exam-data.json': {
                        content: JSON.stringify(data, null, 2)
                    }
                }
            };
            if (sha) {
                body.files['fire-exam-data.json'].sha = sha;
            }

            const response = await fetch('https://api.github.com/gists/' + gistId, {
                method: 'PATCH',
                headers: {
                    'Authorization': 'token ' + token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/vnd.github+json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.message || '写入失败 HTTP ' + response.status);
            }

            // 更新缓存
            this._cache = data;
            this._cacheTime = Date.now();
            return true;
        } catch (err) {
            console.error('写入云端数据失败:', err);
            return false;
        }
    }
};
