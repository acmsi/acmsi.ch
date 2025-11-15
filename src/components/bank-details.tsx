import CopyButton from '@/components/copy-button'

interface BankDetailsProps {
  message: string
  messageLabel?: string
  ibanColorClass?: string
}

export default function BankDetails({
  message,
  messageLabel = 'Message',
  ibanColorClass = 'text-green-600',
}: BankDetailsProps) {
  const iban = 'CH97 0079 0042 4236 1827 8'
  const beneficiary = 'Association Culturelle Musulmane de Saint-Imier'
  const address = 'Rue de la Clef 45, 2610 St-Imier'

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="text-sm text-gray-600 mb-2">Coordonnées bancaires :</p>
      <dl className="text-gray-900 space-y-2 sm:space-y-1">
        <div className="sm:grid sm:grid-cols-[auto_1fr] sm:gap-x-2 sm:items-baseline">
          <dt className="font-bold">IBAN :</dt>
          <dd className={`text-lg font-semibold ${ibanColorClass}`}>
            {iban}
            <CopyButton text={iban} label="l'IBAN" className="ml-2" />
          </dd>
        </div>
        <div className="sm:grid sm:grid-cols-[auto_1fr] sm:gap-x-2 sm:items-baseline">
          <dt className="font-bold">Bénéficiaire :</dt>
          <dd>
            {beneficiary}
            <CopyButton
              text={beneficiary}
              label="le bénéficiaire"
              className="ml-2"
            />
          </dd>
        </div>
        <div className="sm:grid sm:grid-cols-[auto_1fr] sm:gap-x-2 sm:items-baseline">
          <dt className="font-bold">Adresse :</dt>
          <dd>
            {address}
            <CopyButton text={address} label="l'adresse" className="ml-2" />
          </dd>
        </div>
        <div className="sm:grid sm:grid-cols-[auto_1fr] sm:gap-x-2 sm:items-baseline">
          <dt className="font-bold">{messageLabel} :</dt>
          <dd>
            {message}
            <CopyButton text={message} label="le message" className="ml-2" />
          </dd>
        </div>
      </dl>
    </div>
  )
}
