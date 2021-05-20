module.exports = [
    {
        name: "GlobalProperties.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/launch/GlobalProperties.java",
    },
    {
        name: "ContainerHandleURI.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/launch/platform/container/ContainerHandleURI.java",
    },
    {
        name: "ContainerHandleVirtual.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/launch/platform/container/ContainerHandleVirtual.java",
    },
    {
        name: "TreeTransformer.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/transformers/TreeTransformer.java",
    },
    {
        name: "MixinBootstrap.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/launch/MixinBootstrap.java",
    },
    {
        name: "MixinInitialisationError.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/launch/MixinInitialisationError.java",
    },
    {
        name: "MixinConnectorManager.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/launch/platform/MixinConnectorManager.java",
    },
    {
        name: "MixinContainer.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/launch/platform/MixinContainer.java",
    },
    {
        name: "MixinPlatformAgentAbstract.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/launch/platform/MixinPlatformAgentAbstract.java",
    },
    {
        name: "MixinPlatformAgentDefault.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/launch/platform/MixinPlatformAgentDefault.java",
    },
    {
        name: "MixinPlatformManager.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/launch/platform/MixinPlatformManager.java",
    },
    {
        name: "MappingFieldSrg.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/obfuscation/mapping/mcp/MappingFieldSrg.java",
    },
    {
        name: "IMapping.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/obfuscation/mapping/IMapping.java",
    },
    {
        name: "RemapperChain.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/obfuscation/RemapperChain.java",
    },
    {
        name: "Annotations.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/util/Annotations.java",
    },
    {
        name: "TreeTransformer.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/transformers/TreeTransformer.java",
    },
    {
        name: "MixinClassWriter.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/transformers/MixinClassWriter.java",
    },
    {
        name: "MixinService.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/service/MixinService.java",
    },
    {
        name: "MixinServiceAbstract.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/service/MixinServiceAbstract.java",
    },
    {
        name: "IClassProvider.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/service/IClassProvider.java",
    },
    {
        name: "IClassTracker.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/service/IClassTracker.java",
    },
    {
        name: "Locals.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/util/Locals.java",
    },
    {
        name: "ObfuscationUtil.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/util/ObfuscationUtil.java",
    },
    {
        name: "Quantifier.java",
        source: "https://raw.githubusercontent.com/SpongePowered/Mixin/master/src/main/java/org/spongepowered/asm/util/Quantifier.java",
    },
].map((file) => ({
    ...file,
    project: "Mixin",
    projectUrl: "https://github.com/SpongePowered/Mixin",
    licenseUrl: "https://github.com/SpongePowered/Mixin/blob/master/LICENSE.txt",
    license: "MIT",
    language: "Java",
}));
