import { expect, it } from '@jest/globals';
import { checkResponse} from '../services/api'

describe('check checkResponse function', () => {
    it('should be success', () => {
        // AAA = Arrange, Act, Assert
        const testObject = {
            ok: true,
            json: function () {
                return {result: 'OK'};
            }
        };

        const result = checkResponse(testObject);

        expect(result).toEqual({ result: 'OK' });
    })

    it('should be failed', () => {
        
        const testObject = {
            ok: false,
            status: 500,
            json: function () {
                return Promise.reject('Ошибка: 500')
            },
            
        }

        const result = checkResponse(testObject);

        return expect(result).rejects.toBe('Ошибка: 500');
    })
        
})