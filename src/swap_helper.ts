import { ReadonlyMiraAmm } from "mira-dex-ts";
import {PoolId, AssetId, BN, Provider} from "fuels";

/**
 * Генерация входного количества токенов для свапа
 * @param readonlyMiraAmm - Экземпляр ReadonlyMiraAmm
 * @param poolId - Идентификатор пула
 * @param amountIn - Входное количество токенов
 * @param assetIn - Идентификатор входного актива
 * @param assetOut - Идентификатор выходного актива
 * @returns Объект с рассчитанными параметрами для свапа
 */

/**
 * Генерация параметров для свапа
 * @param readonlyMiraAmm - Экземпляр ReadonlyMiraAmm
 * @param provider
 * @param poolId - Идентификатор пула
 * @param amountIn - Входное количество токенов
 * @param assetIn - Идентификатор входного актива
 * @param assetOut - Идентификатор выходного актива
 * @returns Объект с рассчитанными параметрами для свапа
 */
export async function generateSwapParams(
    readonlyMiraAmm: ReadonlyMiraAmm,
    provider: Provider,
    poolId: PoolId,
    amountIn: BN,
    assetIn: AssetId,
    assetOut: AssetId
): Promise<{
    amountOutMin: BN;
    deadline: BN;
    pools: PoolId[];
}> {
    // Получаем предварительный расчет выхода через previewSwapExactInput
    const [resultAssetId, amountOutMin] = await readonlyMiraAmm.previewSwapExactInput(assetIn, amountIn, [poolId]);

    // Проверяем, совпадает ли возвращаемый AssetId с ожидаемым
    if (resultAssetId.bits !== assetOut.bits) {
        throw new Error(`Unexpected output asset ID. Expected: ${assetOut.bits}, got: ${resultAssetId.bits}`);
    }

    // Проверяем, что рассчитанное значение не нулевое
    if (!amountOutMin || amountOutMin.eq(0)) {
        throw new Error("Insufficient output amount");
    }

    // Генерируем дедлайн с использованием futureDeadline
    const deadline = await futureDeadline(provider);

    // Формируем список пулов
    const pools: PoolId[] = [poolId];

    return {
        amountOutMin,
        deadline,
        pools,
    };
}

async function futureDeadline(provider) {
    const block = await provider.getBlock("latest");
    return block?.height.add(1000) ?? 1000000000;
}
