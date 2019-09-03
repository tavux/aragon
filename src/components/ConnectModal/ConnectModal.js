import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { ButtonText, GU, Modal, textStyle, useTheme } from '@aragon/ui'
import providers from '../../ethereum-providers'
import ProviderCard from './ProviderCard'

function ConnectModal({ visible, onConnect, onClose }) {
  const theme = useTheme()

  const modalWidth = useCallback(viewport => {
    return 130 * GU
  }, [])

  return (
    <Modal visible={visible} width={modalWidth} onClose={onClose}>
      <section
        css={`
          display: flex;
          flex-direction: column;
          align-items: center;
        `}
      >
        <header
          css={`
            padding-top: ${4 * GU}px;
            padding-bottom: ${7 * GU}px;
            text-align: center;
          `}
        >
          <h1
            css={`
              // Not in aragonUI - exceptionally used here
              font-size: 40px;
              font-weight: 600;
              padding-bottom: ${2 * GU}px;
            `}
          >
            Connect to an Ethereum provider
          </h1>
          <p
            css={`
              ${textStyle('title4')};
              color: ${theme.contentSecondary};
            `}
          >
            Please install an Ethereum provider to fully use Aragon
          </p>
        </header>
        <div
          css={`
            display: flex;
            justify-content: space-between;
          `}
        >
          {[...providers.values()].map(provider => (
            <ProviderCard
              key={provider.name}
              provider={provider}
              onConnect={onConnect}
            />
          ))}
        </div>
        <p
          css={`
            padding: ${4 * GU}px 0 ${4 * GU}px;
            text-align: center;
            color: ${theme.contentSecondary};
          `}
        >
          <ButtonText href="https://example.com/" external>
            What is a Ethereum provider?
          </ButtonText>
        </p>
      </section>
    </Modal>
  )
}

ConnectModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onConnect: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ConnectModal