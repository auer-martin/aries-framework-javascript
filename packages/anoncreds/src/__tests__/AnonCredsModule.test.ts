import type { AnonCredsRegistry } from '../services'

import { anoncreds2023DataIntegrityServiceSymbol, type DependencyManager } from '@credo-ts/core'

import { anoncreds } from '../../tests/helpers'
import { AnonCredsModule } from '../AnonCredsModule'
import { AnonCredsModuleConfig } from '../AnonCredsModuleConfig'
import { AnonCredsRsHolderService, AnonCredsRsIssuerService, AnonCredsRsVerifierService } from '../anoncreds-rs'
import { AnonCreds2023DataIntegrityServiceImpl } from '../anoncreds-rs/AnonCreds2023DataIntegrityService'
import {
  AnonCredsSchemaRepository,
  AnonCredsCredentialDefinitionRepository,
  AnonCredsCredentialDefinitionPrivateRepository,
  AnonCredsKeyCorrectnessProofRepository,
  AnonCredsLinkSecretRepository,
  AnonCredsRevocationRegistryDefinitionPrivateRepository,
  AnonCredsRevocationRegistryDefinitionRepository,
} from '../repository'
import { AnonCredsHolderServiceSymbol, AnonCredsIssuerServiceSymbol, AnonCredsVerifierServiceSymbol } from '../services'
import { AnonCredsRegistryService } from '../services/registry/AnonCredsRegistryService'

const dependencyManager = {
  registerInstance: jest.fn(),
  registerSingleton: jest.fn(),
} as unknown as DependencyManager

const registry = {} as AnonCredsRegistry

describe('AnonCredsModule', () => {
  test('registers dependencies on the dependency manager', () => {
    const anonCredsModule = new AnonCredsModule({
      registries: [registry],
      anoncreds,
    })
    anonCredsModule.register(dependencyManager)

    expect(dependencyManager.registerSingleton).toHaveBeenCalledTimes(12)
    expect(dependencyManager.registerSingleton).toHaveBeenCalledWith(AnonCredsRegistryService)
    expect(dependencyManager.registerSingleton).toHaveBeenCalledWith(AnonCredsSchemaRepository)
    expect(dependencyManager.registerSingleton).toHaveBeenCalledWith(AnonCredsCredentialDefinitionRepository)
    expect(dependencyManager.registerSingleton).toHaveBeenCalledWith(AnonCredsCredentialDefinitionPrivateRepository)
    expect(dependencyManager.registerSingleton).toHaveBeenCalledWith(AnonCredsKeyCorrectnessProofRepository)
    expect(dependencyManager.registerSingleton).toHaveBeenCalledWith(AnonCredsLinkSecretRepository)
    expect(dependencyManager.registerSingleton).toHaveBeenCalledWith(AnonCredsRevocationRegistryDefinitionRepository)
    expect(dependencyManager.registerSingleton).toHaveBeenCalledWith(
      AnonCredsRevocationRegistryDefinitionPrivateRepository
    )

    expect(dependencyManager.registerSingleton).toHaveBeenCalledWith(
      AnonCredsHolderServiceSymbol,
      AnonCredsRsHolderService
    )
    expect(dependencyManager.registerSingleton).toHaveBeenCalledWith(
      AnonCredsIssuerServiceSymbol,
      AnonCredsRsIssuerService
    )
    expect(dependencyManager.registerSingleton).toHaveBeenCalledWith(
      AnonCredsVerifierServiceSymbol,
      AnonCredsRsVerifierService
    )

    expect(dependencyManager.registerSingleton).toHaveBeenCalledWith(
      anoncreds2023DataIntegrityServiceSymbol,
      AnonCreds2023DataIntegrityServiceImpl
    )

    expect(dependencyManager.registerInstance).toHaveBeenCalledTimes(1)
    expect(dependencyManager.registerInstance).toHaveBeenCalledWith(AnonCredsModuleConfig, anonCredsModule.config)
  })
})
