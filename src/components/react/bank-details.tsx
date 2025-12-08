import CopyButton from './copy-button'
import InfoTooltip from './info-tooltip'

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
  const swift = 'KBBECH22'
  const beneficiary = 'Association Culturelle Musulmane de Saint-Imier'
  const address = 'Rue de la Clef 45, 2610 St-Imier'

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <p className="text-sm text-gray-600 mb-2">Coordonnées bancaires :</p>
      <dl className="text-gray-900 space-y-2 sm:space-y-1">
        <div className="sm:grid sm:grid-cols-[auto_1fr] sm:gap-x-2 sm:items-baseline">
          <dt className="font-bold">IBAN :</dt>
          <dd
            className={`flex flex-wrap items-center gap-1 text-lg font-semibold ${ibanColorClass}`}
          >
            <span>{iban}</span>
            <CopyButton text={iban} label="l'IBAN" />
          </dd>
        </div>
        <div className="sm:grid sm:grid-cols-[auto_1fr] sm:gap-x-2 sm:items-baseline">
          <dt className="font-bold">SWIFT/BIC :</dt>
          <dd className="flex flex-wrap items-center gap-1">
            <span>{swift}</span>
            <CopyButton text={swift} label="le SWIFT" />
            <InfoTooltip text="Si votre banque demande 11 caractères, ajoutez XXX à la fin : KBBECH22XXX" />
          </dd>
        </div>
        <div className="sm:grid sm:grid-cols-[auto_1fr] sm:gap-x-2 sm:items-baseline">
          <dt className="font-bold">Bénéficiaire :</dt>
          <dd className="flex flex-wrap items-center gap-1">
            <span>{beneficiary}</span>
            <CopyButton text={beneficiary} label="le bénéficiaire" />
          </dd>
        </div>
        <div className="sm:grid sm:grid-cols-[auto_1fr] sm:gap-x-2 sm:items-baseline">
          <dt className="font-bold">Adresse :</dt>
          <dd className="flex flex-wrap items-center gap-1">
            <span>{address}</span>
            <CopyButton text={address} label="l'adresse" />
          </dd>
        </div>
        <div className="sm:grid sm:grid-cols-[auto_1fr] sm:gap-x-2 sm:items-baseline">
          <dt className="font-bold">{messageLabel} :</dt>
          <dd className="flex flex-wrap items-center gap-1">
            <span>{message}</span>
            <CopyButton text={message} label="le message" />
          </dd>
        </div>
      </dl>
    </div>
  )
}
