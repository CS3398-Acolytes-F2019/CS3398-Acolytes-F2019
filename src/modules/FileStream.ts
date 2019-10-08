export class FileStream
{

    private offset = 0;
    private readonly chunkSize = 1000000;

    constructor(private file: File, private controller: ReadableStreamDefaultController<any>)
    {
        this.seek();
    }

    private readerHandler = async (event: any) =>
    {
        this.offset += this.chunkSize;

        const chunk = new Uint8Array(event.target.result);

        this.controller.enqueue(chunk);

        if (this.offset >= this.file.size)
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