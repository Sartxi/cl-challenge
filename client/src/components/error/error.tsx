import { Error } from "../../types/app";

export default function ErrorPod({ error }: Error) {
  return (
    <div className="error">
      <h1>Oops there was an error!</h1>
      <div className="apollo-error">
        <span>Cause:</span> {error.cause?.message}
      </div>
    </div>
  )
}