import { PythonShell } from "python-shell";
import * as fs from "fs";

export const getRecomendation = () => {
    PythonShell.run(
        "C:\\Users\\piotr\\Desktop\\repos\\spotifyRecommendation\\main.py",
        null,
        (err, result) => {}
    );

    setTimeout(() => {}, 1000);
    let song = fs.readFileSync(
        "C:\\Users\\piotr\\Desktop\\repos\\spotifyRecommendation\\recommendation.txt",
        "utf-8"
    );

    return song;
};
