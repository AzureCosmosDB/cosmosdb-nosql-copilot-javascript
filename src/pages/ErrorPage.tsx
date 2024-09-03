import { useRouteError } from "react-router-dom";
import Icon from "../components/Icon";
import { ShieldX } from 'lucide-react'

export default function ErrorPage() {

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const error: any = useRouteError();
    console.error(error);

    return (
        <div className="grid place-items-center h-screen bg-gray-100 text-center p-6">
            <div className="bg-white shadow-md rounded-lg p-8">
                <div className="mb-4">
                    <ShieldX color="red" size={48} />
                </div>
                <h1 className="text-2xl font-bold mb-2">Oops!</h1>
                <p className="text-gray-600 mb-4">Sorry, an unexpected error has occurred.</p>
                <p className="text-red-500">
                    <i>{error?.statusText || error?.message}</i>
                </p>
            </div>
        </div>

    )
}