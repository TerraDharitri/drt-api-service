import { forwardRef, Module } from "@nestjs/common";
import { AssetsModule } from "src/common/assets/assets.module";
import { PluginModule } from 'src/plugins/plugin.module';
import { DcdtModule } from "../dcdt/dcdt.module";
import { NftMarketplaceModule } from "../marketplace/nft.marketplace.module";
import { TokenModule } from "../tokens/token.module";
import { VmQueryModule } from "../vm.query/vm.query.module";
import { CollectionService } from "./collection.service";

@Module({
  imports: [
    forwardRef(() => DcdtModule),
    forwardRef(() => VmQueryModule),
    forwardRef(() => TokenModule),
    forwardRef(() => AssetsModule),
    forwardRef(() => PluginModule),
    forwardRef(() => NftMarketplaceModule),
  ],
  providers: [
    CollectionService,
  ],
  exports: [
    CollectionService,
  ],
})
export class CollectionModule { }
