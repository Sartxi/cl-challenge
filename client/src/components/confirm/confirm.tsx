import { ConfirmProps } from "../../types/app";

export default function ConfirmDialog({ text, callback, close }: ConfirmProps) {
  return (
    <>
      <div className="dialog-backdrop"></div>
      <dialog open>
        <h2>{text}</h2>
        <div className="btns">
          <button className='btn' onClick={() => callback()}>Confirm</button>
          <button className='btn muted' onClick={() => close()}>Nevermind</button>
        </div>
      </dialog>
    </>
  )
}
