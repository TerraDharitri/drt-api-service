import { DynamicModule, Module, Type } from "@nestjs/common";
import configuration from "config/configuration";
import { PluginModule } from 'src/plugins/plugin.module';
import { DynamicModuleUtils } from "src/utils/dynamic.module.utils";
import { AccountController } from "./accounts/account.controller";
import { BlockController } from "./blocks/block.controller";
import { CollectionController } from "./collections/collection.controller";
import { DappConfigController } from "./dapp-config/dapp.config.controller";
import { DelegationLegacyController } from "./delegation.legacy/delegation.legacy.controller";
import { DelegationController } from "./delegation/delegation.controller";
import { EndpointsServicesModule } from "./endpoints.services.module";
import { HealthCheckController } from "./health-check/health.check.controller";
import { IdentitiesController } from "./identities/identities.controller";
import { KeysController } from "./keys/keys.controller";
import { NftMarketplaceController } from "./marketplace/nft.marketplace.controller";
import { MoaController } from "./moa/moa.controller";
import { MiniBlockController } from "./miniblocks/mini.block.controller";
import { NetworkController } from "./network/network.controller";
import { NftController } from "./nfts/nft.controller";
import { TagController } from "./nfttags/tag.controller";
import { NodeController } from "./nodes/node.controller";
import { ProcessNftsPublicController } from "./process-nfts/process.nfts.public.controller";
import { ProviderController } from "./providers/provider.controller";
import { GatewayProxyController } from "./proxy/gateway.proxy.controller";
import { ProxyModule } from "./proxy/proxy.module";
import { RoundController } from "./rounds/round.controller";
import { SmartContractResultController } from "./sc-results/scresult.controller";
import { ShardController } from "./shards/shard.controller";
import { StakeController } from "./stake/stake.controller";
import { TokenController } from "./tokens/token.controller";
import { TransactionsBatchController } from "./transactions.batch/transactions.batch.controller";
import { TransactionController } from "./transactions/transaction.controller";
import { TransferController } from "./transfers/transfer.controller";
import { UsernameController } from "./usernames/username.controller";
import { VmQueryController } from "./vm.query/vm.query.controller";
import { WaitingListController } from "./waiting-list/waiting.list.controller";
import { WebsocketController } from "./websocket/websocket.controller";
import { PoolController } from "./pool/pool.controller";
import { TpsController } from "./tps/tps.controller";
import { ApplicationController } from "./applications/application.controller";
import { EventsController } from "./events/events.controller";
import { MediaController } from "./media/media.controller";

@Module({})
export class EndpointsControllersModule {
  static forRoot(): DynamicModule {
    const controllers: Type<any>[] = [
      AccountController, BlockController, CollectionController, DelegationController, DelegationLegacyController, IdentitiesController,
      KeysController, MiniBlockController, NetworkController, NftController, TagController, NodeController,
      ProviderController, GatewayProxyController, RoundController, SmartContractResultController, ShardController, StakeController, StakeController,
      TokenController, TransactionController, UsernameController, VmQueryController, WaitingListController,
      HealthCheckController, DappConfigController, WebsocketController, TransferController,
      ProcessNftsPublicController, TransactionsBatchController, ApplicationController, EventsController,
      MediaController,
    ];

    const isMarketplaceFeatureEnabled = configuration().features?.marketplace?.enabled ?? false;
    if (isMarketplaceFeatureEnabled) {
      controllers.push(NftMarketplaceController);
    }

    const isExchangeEnabled =
      (configuration().features?.exchange?.enabled ?? false) ||
      (configuration()['transaction-action']?.moa?.microServiceUrl) ||
      (configuration()['plugins']?.['transaction-action']?.['moa']?.['microServiceUrl']);

    if (isExchangeEnabled) {
      controllers.push(MoaController);
    }

    const isTxPoolEnabled = configuration().features?.transactionPool?.enabled;
    if (isTxPoolEnabled) {
      controllers.push(PoolController);
    }

    const isTpsEnabled = configuration().features?.tps?.enabled;
    if (isTpsEnabled) {
      controllers.push(TpsController);
    }

    return {
      module: EndpointsControllersModule,
      imports: [
        EndpointsServicesModule,
        ProxyModule,
        PluginModule,
      ],
      providers: [
        DynamicModuleUtils.getNestJsApiConfigService(),
      ],
      controllers,
    };
  }
}
