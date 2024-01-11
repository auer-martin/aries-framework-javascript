import type {
  AssertedUniformCredentialOffer,
  CredentialRequestJwtVcJson,
  CredentialRequestJwtVcJsonLdAndLdpVc,
  CredentialRequestSdJwtVc,
  CredentialSupported,
  UniformCredentialRequest,
} from '@sphereon/oid4vci-common'

export type OpenId4VciCredentialSupportedWithId = CredentialSupported & { id: string }
export type OpenId4VciCredentialSupported = CredentialSupported
export type OpenId4VciCredentialRequest = UniformCredentialRequest
export type OpenId4VciCredentialRequestJwtVcJson = CredentialRequestJwtVcJson
export type OpenId4VciCredentialRequestJwtVcJsonLdAndLdpVc = CredentialRequestJwtVcJsonLdAndLdpVc
export type OpenId4VciCredentialRequestSdJwtVc = CredentialRequestSdJwtVc
export type OpenId4VciCredentialOffer = AssertedUniformCredentialOffer

export * from './CredentialHolderBinding'
