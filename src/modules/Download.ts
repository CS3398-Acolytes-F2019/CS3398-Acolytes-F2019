import { Firebase } from "./Firebase"; 
export class DownloadStream
{

    private index = 0;
    private readonly chunkSize = 65536;
    private chunks: number;
    private fileSize: number;

    private iv: Uint8Array;
    private alg: {name: string, iv: Uint8Array};
    private cryptoKey: CryptoKey | null = null;

    constructor(private file: string, private key: string, size: number, private controller: ReadableStreamDefaultController<any>)
    {
        this.fileSize = size;
        this.chunks = Math.ceil(this.fileSize / this.chunkSize)
        this.iv = crypto.getRandomValues(new Uint8Array(12));
        this.alg = { name: 'AES-GCM', iv: this.iv }; 
        this.seek();
    }

    private readerHandler = async (blob: any) =>
    {

        // if(!this.cryptoKey)
        // {
        //     this.cryptoKey = await crypto.subtle.importKey("raw", new Uint8Array(), this.alg.name, false, ['encrypt']);
        // }

        const plaintextUint8 = new Uint8Array(blob);
        // const ciphertextBuffer = await crypto.subtle.encrypt(this.alg, this.cryptoKey, plaintextUint8);

        // const ciphertextUint8 = new Uint8Array(ciphertextBuffer);

        this.controller.enqueue(plaintextUint8);

        this.index++;

        if (this.index >= this.chunks-1)
        {
            this.controller.close();
            return;
        }

        await this.seek();
    }

    private async seek()
    {
        if(this.index == 1) return;

        let reference = Firebase.storage().ref(`files/${this.file}/${this.index}.chunk`);

        let url = await reference.getDownloadURL();

        let result = await fetch(url, {
            method: "GET"
        });

        let blob = await result.blob()

        await this.readerHandler(blob);
    }

}