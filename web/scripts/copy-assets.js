import { copyFile, mkdir } from 'fs/promises'
import { join } from 'path'

async function copyAssets () {
    try {
        // Cria a pasta dist se não existir
        await mkdir('dist', { recursive: true })
        await mkdir('dist/icons', { recursive: true })

        // Copia o manifest.json
        await copyFile('manifest.json', 'dist/manifest.json')

        // Copia os ícones
        const iconSizes = [16, 48, 128]
        for (const size of iconSizes) {
            await copyFile(
                `icons/icon${size}.png`,
                `dist/icons/icon${size}.png`
            )
        }

        console.log('Arquivos copiados com sucesso!')
    } catch (error) {
        console.error('Erro ao copiar arquivos:', error)
        process.exit(1)
    }
}

copyAssets() 