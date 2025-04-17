import sharp from 'sharp';
import { mkdir } from 'fs/promises';
import { join } from 'path';

async function generateIcons () {
    try {
        // Cria a pasta icons se não existir
        await mkdir('icons', { recursive: true });

        // Tamanhos dos ícones
        const sizes = [16, 48, 128];

        // Gera os ícones em cada tamanho
        for (const size of sizes) {
            await sharp('icons/icon.svg')
                .resize(size, size)
                .png()
                .toFile(`icons/icon${size}.png`);
        }

        console.log('Ícones gerados com sucesso!');
    } catch (error) {
        console.error('Erro ao gerar ícones:', error);
        process.exit(1);
    }
}

generateIcons(); 