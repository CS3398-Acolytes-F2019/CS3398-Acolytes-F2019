import { Callback } from "../interfaces/Types";

export class FileStream
{

    private offset = 0;
    private readonly chunkSize = 65536;
    private fileSize: number;

    constructor(private file: File, private controller: ReadableStreamDefaultController<any>, private progressHandler: Callback)
    {
        this.fileSize = file.size;
        
        this.seek();
    }

    private readerHandler(event: ProgressEvent<any>)
    {
        this.offset += this.chunkSize;

        let slice = new Uint8Array(event.target.result);

        let progress = this.offset / this.fileSize;

        this.progressHandler(this.offset / this.fileSize);

        if (this.offset >= this.fileSize) 
        {
            this.controller.close();
            return;
        }

        this.controller.enqueue(slice);

        this.seek();
    }

    public seek()
    {
        const fileReader = new FileReader();

        const  blob = this.file.slice(this.offset, this.offset + this.chunkSize);

        fileReader.onload = this.readerHandler;

        fileReader.readAsArrayBuffer(blob);
    }

}