import { Flexbox } from "@/components/Flexbox/Flexbox";
import { Typography } from "@/components/Typography/Typography";
import { Button } from "@/components/Button/Button";

export const LearningTracksDisplay = () => {
    return (
        <Flexbox className="w-full bg-amber-400 p-4" direction="row">
            <div className="w-100 h-30 bg-amber-950"></div>
            <Flexbox>
                <div>
                    <Typography variant="p">description</Typography>
                    <Typography variant="p">contains n courses</Typography>
                </div>
                <div>
                    <div>
                        <p>34 students</p>
                        <div className="h-1 w-1 bg-amber-300"></div>
                        <div className="h-1 w-1 bg-amber-300"></div>
                        <div className="h-1 w-1 bg-amber-300"></div>
                        <div className="h-1 w-1 bg-amber-300"></div>
                        <div className="h-1 w-1 bg-amber-300"></div>
                    </div>
                    <p>Course Name</p>
                    <Button>Specialize</Button>
                </div>
            </Flexbox>
        </Flexbox>
    );
};
