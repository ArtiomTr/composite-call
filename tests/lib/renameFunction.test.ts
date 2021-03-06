import { compose } from '../..';
import { renameFunction } from '../../src';

describe('renameFunction', () => {
    it('should rename standard function', async () => {
        function testFn(a: string, b: string) {
            return { c: a + b };
        }

        const functionName = 'new function name';

        renameFunction(testFn, functionName);

        const composed = compose(testFn, 'hello', 'world');

        expect(composed.getSequence()[0]).toStrictEqual({
            name: functionName,
            index: expect.any(Number),
            parameterNames: ['a', 'b'],
            parameters: ['hello', 'world'],
        });
    });

    it('should rename arrow function', async () => {
        const testFn = (a: string, b: string): { c: string } => {
            return { c: a + b };
        };

        const functionName = 'new function name';

        renameFunction(testFn, functionName);

        const composed = compose(testFn, 'hello', 'world');

        expect(composed.getSequence()[0]).toStrictEqual({
            name: functionName,
            index: expect.any(Number),
            parameterNames: ['a', 'b'],
            parameters: ['hello', 'world'],
        });
    });

    it('should rename class method', async () => {
        class DummyClass {
            testFn(a: string, b: string) {
                return { c: a + b };
            }
        }

        const dummyInstance = new DummyClass();

        const functionName = 'new function name';

        renameFunction(dummyInstance.testFn, functionName);

        const composed = compose(dummyInstance.testFn, 'hello', 'world');

        expect(composed.getSequence()[0]).toStrictEqual({
            name: functionName,
            index: expect.any(Number),
            parameterNames: ['a', 'b'],
            parameters: ['hello', 'world'],
        });
    });

    it('should rename class parameter (arrow function)', async () => {
        class DummyClass {
            testFn = (a: string, b: string): { c: string } => {
                return { c: a + b };
            };
        }

        const dummyInstance = new DummyClass();

        const functionName = 'new function name';

        renameFunction(dummyInstance.testFn, functionName);

        const composed = compose(dummyInstance.testFn, 'hello', 'world');

        expect(composed.getSequence()[0]).toStrictEqual({
            name: functionName,
            index: expect.any(Number),
            parameterNames: ['a', 'b'],
            parameters: ['hello', 'world'],
        });
    });
});
