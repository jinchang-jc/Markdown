// 自定义Markdown规则：将---替换为长横线
marked.use({
    extensions: [{
        name: 'dash',
        level: 'block',
        start(src) { return src.match(/---/)?.index; },
        tokenizer(src) {
            const match = src.match(/^---+/);
            if (match) {
                return {
                    type: 'dash',
                    raw: match[0]
                };
            }
        },
        renderer() {
            return '<hr style="border: 0; border-top: 1px solid #000; margin: 1em 0;">'; 
            // 或 return '—'; // 直接输出长横线
        }
    }]
});

// 文件导入
document.getElementById('fileInput').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('editor').value = e.target.result;
        updatePreview();
    };
    reader.readAsText(file, 'UTF-8');
});

// 实时预览
document.getElementById('editor').addEventListener('input', updatePreview);

function updatePreview() {
    const markdown = document.getElementById('editor').value;
    document.getElementById('preview').innerHTML = marked.parse(markdown);
}
