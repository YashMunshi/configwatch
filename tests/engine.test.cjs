'use strict';
const test=require('node:test'),assert=require('node:assert/strict'),E=require('../web/engine.js');
const copy=()=>structuredClone(E.initial);

test('Default baseline detects exactly four drifts',()=>{const r=E.run(copy());assert.equal(r.metrics.drift,4);assert.equal(r.metrics.applied,0);});
test('Preview leaves the input untouched',()=>{const x=copy(),before=JSON.stringify(x);E.run(x);assert.equal(JSON.stringify(x),before);});
test('Approved repair satisfies the baseline and keeps rollback',()=>{const x=copy();x.applyApproved=true;const r=E.run(x);assert.equal(r.report.after.audit.enabled,true);assert.deepEqual(r.report.rollback,x.configuration);const next=copy();next.configuration=r.report.after;assert.equal(E.run(next).metrics.drift,0);});
test('Prototype traversal is rejected',()=>{const x=copy();x.baseline[0].path='__proto__.polluted';assert.throws(()=>E.run(x),/Unsafe/);assert.equal({}.polluted,undefined);});
test('Missing attributes are explicit drift',()=>{const x=copy();delete x.configuration.audit.enabled;assert.equal(E.run(x).rows[0].actual,'MISSING');});
test('Higher retention satisfies a numeric minimum',()=>{const x=copy();x.configuration.audit.retentionDays=365;assert.equal(E.run(x).rows.find(r=>r.rule==='retention').status,'pass');});
