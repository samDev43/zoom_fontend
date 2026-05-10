// import axios from "axios";
import { useEffect } from "react";

export function Test(){
    // const [data, setData] = useState(null);

    useEffect(() => {
        const fetchTest = async () => {
           fetch("http://localhost/ZOOM_BACKEND/api/test.php")
  .then(r => r.text())
  .then(console.log)
  .catch(console.error);
        };

        fetchTest();
    }, []);

    return (
        <div>
            {/* {data ? <p>{data}</p> : <p>Loading...</p>} */}
        </div>
    );
}