"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
var lib_dynamodb_1 = require("@aws-sdk/lib-dynamodb");
var fs = require("fs");
var client = new client_dynamodb_1.DynamoDBClient({ region: 'us-east-1' });
var ddbDocClient = lib_dynamodb_1.DynamoDBDocumentClient.from(client);
var TABLE_NAME = 'Counties';
var populateDynamoDb = function () { return __awaiter(void 0, void 0, void 0, function () {
    var rawData, requests, _i, _a, _b, stateAbbrev, stateInfo, stateName, _c, _d, _e, countyName, countyFips, county, error_1;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 9, , 10]);
                rawData = JSON.parse(fs.readFileSync('./fips_lookup_by_state.json', 'utf-8'));
                requests = [];
                _i = 0, _a = Object.entries(rawData);
                _f.label = 1;
            case 1:
                if (!(_i < _a.length)) return [3 /*break*/, 6];
                _b = _a[_i], stateAbbrev = _b[0], stateInfo = _b[1];
                stateName = stateInfo._name;
                _c = 0, _d = Object.entries(stateInfo);
                _f.label = 2;
            case 2:
                if (!(_c < _d.length)) return [3 /*break*/, 5];
                _e = _d[_c], countyName = _e[0], countyFips = _e[1];
                if (countyName.startsWith('_'))
                    return [3 /*break*/, 4]; // Skip metadata keys
                county = {
                    state: stateName,
                    countyName: countyName,
                    abbrev: stateAbbrev,
                    fips: countyFips,
                };
                requests.push({
                    PutRequest: {
                        Item: county,
                    },
                });
                if (!(requests.length === 25)) return [3 /*break*/, 4];
                return [4 /*yield*/, writeBatchToDynamo(requests)];
            case 3:
                _f.sent();
                requests.length = 0; // Clear the batch
                _f.label = 4;
            case 4:
                _c++;
                return [3 /*break*/, 2];
            case 5:
                _i++;
                return [3 /*break*/, 1];
            case 6:
                if (!(requests.length > 0)) return [3 /*break*/, 8];
                return [4 /*yield*/, writeBatchToDynamo(requests)];
            case 7:
                _f.sent();
                _f.label = 8;
            case 8:
                console.log('Data successfully populated!');
                return [3 /*break*/, 10];
            case 9:
                error_1 = _f.sent();
                console.error('Error populating data:', error_1);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
var writeBatchToDynamo = function (requests) { return __awaiter(void 0, void 0, void 0, function () {
    var params, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                params = {
                    RequestItems: (_a = {},
                        _a[TABLE_NAME] = requests,
                        _a),
                };
                return [4 /*yield*/, ddbDocClient.send(new lib_dynamodb_1.BatchWriteCommand(params))];
            case 1:
                _b.sent();
                return [3 /*break*/, 3];
            case 2:
                error_2 = _b.sent();
                console.error('Error writing batch to DynamoDB:', error_2);
                throw error_2;
            case 3: return [2 /*return*/];
        }
    });
}); };
populateDynamoDb();
