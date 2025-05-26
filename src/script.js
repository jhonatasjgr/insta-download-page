 const form = document.getElementById('downloadForm');
        const loader = document.getElementById('loader');
        const errorMsg = document.getElementById('errorMsg');
        const downloadLink = document.getElementById('downloadLink');
        const downloadBtn = document.getElementById('downloadBtn');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            errorMsg.textContent = '';
            downloadLink.style.display = 'none';
            loader.style.display = 'block';
            downloadBtn.disabled = true;

            const url = document.getElementById('instaUrl').value.trim();

            try {
               // Alteração: apontando para a API em produção Render
               const response = await fetch(`https://api-download-fc2a.onrender.com/download/?url=${encodeURIComponent(url)}`);

                if (!response.ok) throw new Error('Falha ao conectar com o serviço. Tente novamente.');

                const data = await response.json();

                if (data && data.videoUrl) {
                    downloadLink.href = data.videoUrl;
                    downloadLink.style.display = 'block';
                    downloadLink.textContent = "Clique aqui para baixar";
                } else {
                    errorMsg.textContent = 'Não foi possível encontrar o vídeo. Verifique o link e tente novamente.';
                }
            } catch (err) {
                errorMsg.textContent = err.message || 'Erro inesperado. Tente novamente.';
            } finally {
                loader.style.display = 'none';
                downloadBtn.disabled = false;
            }
        });