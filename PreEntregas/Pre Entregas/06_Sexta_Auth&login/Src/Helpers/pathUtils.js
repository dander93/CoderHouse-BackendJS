import { fileURLToPath } from 'url';
import { dirname, sep } from 'path';


const __filename = fileURLToPath(import.meta.url);


let __app_base_path = dirname(__filename).split(sep)

__app_base_path.pop()
__app_base_path.pop()

const __app_base_dirname = __app_base_path.join(sep);


export default __app_base_dirname;