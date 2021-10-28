import { Request, Response } from "express";
import { exec } from "child_process";


class FileController{

async create(request: Request, response: Response){
    const file_info: {name, content} = request.body;

    const file_message = create_file(file_info.name, file_info.content);

    return response.status(200).json("O arquivo "+file_info.name+" foi criado com sucesso!" ); 
}

}

function create_file(name, content){
    const command = "echo "+content+" > files/"+name

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        return stdout;
    })
}

export {FileController}