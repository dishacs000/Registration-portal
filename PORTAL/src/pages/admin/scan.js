import React, { useEffect, useState } from 'react'
import Scanner from '@/Components/Scanner'
import { useRouter } from 'next/router';

function scan() {
  const router = useRouter()
  const [success, setSuccess] = useState(false)
  const [text, setText] = useState(null)

  const onNewScanResult = (decodedText, decodedResult) => {
    setText(decodedResult.result.text)
    setSuccess(true)
  };

  useEffect(() => {
    if (success) {
      router.push(`/admin/registrationDetails/${text}`)
    }
  }, [success])

  return (
    <div>
      <Scanner
        fps={10}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
    </div>
  )
}

export default scan