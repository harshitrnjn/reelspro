import UploadExample from "./UploadExample";

export default function Page({ searchParams } : { searchParams : any }) {
  return <UploadExample userName={searchParams.user} />;
}