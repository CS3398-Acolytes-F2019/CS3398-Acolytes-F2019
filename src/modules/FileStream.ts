import { aesGcmEncrypt } from "./GCM";

export class FileStream
{

    private offset = 0;
    private readonly chunkSize = 1000000;
    private fileSize: number;

    private iv: Uint8Array;
    private alg: { name: string, iv: Uint8Array };
    private key: CryptoKey | null = null;

    constructor(private file: File, private password: string, private controller: ReadableStreamDefaultController<any>)
    {
        this.fileSize = file.size;
        this.iv = crypto.getRandomValues(new Uint8Array(12));
        this.alg = { name: 'AES-GCM', iv: this.iv };
        this.seek();
    }

    private readerHandler = async (event: any) =>
    {
        this.offset += this.chunkSize;

        const plaintextUint8 = new Uint8Array(event.target.result);

        const ciphertext = aesGcmEncrypt(plaintextUint8, this.password)

        this.controller.enqueue(plaintextUint8);

        if (this.offset >= this.fileSize)
        {
            this.controller.close();
            return;
        }

        this.seek();
    }

    private seek()
    {
        const fileReader = new FileReader();

        const blob = this.file.slice(this.offset, this.offset + this.chunkSize);

        fileReader.onload = this.readerHandler;

        fileReader.readAsArrayBuffer(blob);
    }

}