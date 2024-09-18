import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

async function main() {
    try {
        await mongoose.connect(config.database_url as string);

        app.listen(config.port, () => {
            console.log(
                `My App is listening on port ${config.port} ! Yeah !!!`
            );
        });
    } catch (error: any) {
        console.log(error.message);
    }
}

main();
